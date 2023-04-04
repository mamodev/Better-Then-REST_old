export class Mutex {
  private _locked: boolean = false;
  private _waitQueue: Array<(vaalue: unknown) => void> = [];

  public async acquire(): Promise<void> {
    while (this._locked) {
      await new Promise((resolve) => this._waitQueue.push(resolve));
    }
    this._locked = true;
  }

  public release(): void {
    const resolve = this._waitQueue.shift();

    if (resolve) resolve(null);
    else this._locked = false;
  }
}

export class SequentialCounter {
  private _counter: number = 0;
  private _mutex: Mutex = new Mutex();

  public async getNext(): Promise<number> {
    await this._mutex.acquire();
    const nextValue = ++this._counter;
    this._mutex.release();
    return nextValue;
  }
}
