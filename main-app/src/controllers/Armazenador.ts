export class Armazenador {
  private constructor() {}

  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  static salvar<T>(chave: string, valor: T): void {
    if (!this.isBrowser()) return;

    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  static obter<T>(
    chave: string,
    reviver?: (this: unknown, key: string, value: unknown) => unknown
  ): T | null {
    if (!this.isBrowser()) return null;

    const valor = localStorage.getItem(chave);
    if (valor === null) {
      return null;
    }

    try {
      if (reviver) {
        return JSON.parse(valor, reviver) as T;
      }
      return JSON.parse(valor) as T;
    } catch (error) {
      console.error(`Error parsing stored value for key "${chave}":`, error);
      return null;
    }
  }
}
