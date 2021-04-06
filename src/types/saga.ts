import { Effect, SimpleEffect } from 'redux-saga/effects';
/**
 *
 * @author Leo
 * @desc 解决yield any问题
 * @date 2021-03-30 10:06:34
 */
type StripEffects<T> = T extends IterableIterator<infer E>
  ? E extends Effect | SimpleEffect<any, any>
    ? never
    : E
  : never;

type DecideReturn<T> = T extends Promise<infer R>
  ? R
  : T extends IterableIterator<any>
  ? StripEffects<T>
  : T;

export type CallReturnType<T extends (...args: any[]) => any> = DecideReturn<
  ReturnType<T>
>;

export type SagaReturnType<T extends (...args: any[]) => any> = StripEffects<
  ReturnType<T>
>;
