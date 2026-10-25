import type {
  GitHubRepositoryRef,
  ProjectMetadata,
} from "@portfolio/contracts";
import { ProjectMetadataSchema } from "@portfolio/contracts";

import type { AppConfig } from "../config.js";
import { AppError } from "../errors.js";

export interface GitHubMetadataProvider {
  isReady(): boolean;
  getPublicRepository(
    repository: GitHubRepositoryRef,
  ): Promise<ProjectMetadata | null>;
}

const transientStatus = (status: number): boolean =>
  status === 429 || status >= 500;

export class GitHubApiProvider implements GitHubMetadataProvider {
  constructor(
    private readonly approvedRepositories: GitHubRepositoryRef[],
    private readonly timeoutMs: number,
    private readonly token?: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  isReady(): boolean {
    return true;
  }

  async getPublicRepository(
    repository: GitHubRepositoryRef,
  ): Promise<ProjectMetadata | null> {
    if (
      !this.approvedRepositories.some(
        (item) =>
          item.owner === repository.owner && item.name === repository.name,
      )
    ) {
      throw new AppError(404, "PROJECT_NOT_FOUND", "Project not found.");
    }

    const url = `https://api.github.com/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}`;
    let response: Response | undefined;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        response = await this.fetchImpl(url, {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-api",
            "X-GitHub-Api-Version": "2022-11-28",
            ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
          },
          signal: AbortSignal.timeout(this.timeoutMs),
        });
      } catch {
        if (attempt === 0) continue;
        throw new AppError(
          503,
          "PROJECT_PROVIDER_UNAVAILABLE",
          "Project metadata is temporarily unavailable.",
        );
      }
      if (!transientStatus(response.status) || attempt === 1) break;
    }

    if (!response) {
      throw new AppError(
        503,
        "PROJECT_PROVIDER_UNAVAILABLE",
        "Project metadata is temporarily unavailable.",
      );
    }
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new AppError(
        503,
        "PROJECT_PROVIDER_UNAVAILABLE",
        "Project metadata is temporarily unavailable.",
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    return ProjectMetadataSchema.parse({
      owner: repository.owner,
      name: repository.name,
      fullName: data.full_name,
      description:
        typeof data.description === "string" ? data.description : null,
      htmlUrl: data.html_url,
      language: typeof data.language === "string" ? data.language : null,
      stars: data.stargazers_count,
      forks: data.forks_count,
      isArchived: data.archived === true,
      updatedAt: typeof data.updated_at === "string" ? data.updated_at : null,
    });
  }
}

export const createGitHubProvider = (
  config: AppConfig,
): GitHubMetadataProvider =>
  new GitHubApiProvider(
    config.githubRepos,
    config.upstreamTimeoutMs,
    config.githubToken,
  );
