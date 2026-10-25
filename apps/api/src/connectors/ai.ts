export interface AiProvider {
  readonly name: string;
  isReady(): boolean;
  generate(input: {
    prompt: string;
    maxOutputTokens?: number;
  }): Promise<{ text: string }>;
}
