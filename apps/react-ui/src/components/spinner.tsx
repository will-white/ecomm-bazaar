import * as React from 'react';

export function Spinner({
  show,
  wait,
}: {
  readonly show?: boolean;
  readonly wait?: `delay-${number}`;
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${
        (show ?? true)
          ? `opacity-1 duration-500 ${wait ?? 'delay-300'}`
          : 'duration-500 opacity-0 delay-0'
      }`}
    >
      ⍥
    </div>
  );
}
