import {Pipe, PipeTransform} from "@angular/core";
import memo from 'memo-decorator';

@Pipe({
  name: 'fibo',
  standalone: true
})
export class FiboPipe implements PipeTransform{

  @memo()
  fibonnaci (n: number): number {
    if (n==1 || n==0) {
      return 1;
    }
    return this.fibonnaci(n-1) + this.fibonnaci(n-2);
  }

  transform(value:number): number {
    const fib = this.fibonnaci(value);
    console.log({value, fib});
    return fib;
  }

}

