import user from './user';

export default function* rootSage() {
  yield* [...user];
}
