import React from 'react';
import { Knob } from '../src/Knob';
import { Arc } from '../src/Arc';
import { Pointer } from '../src/Pointer';

interface ExampleKnobProps {
  label: string
  value: number
  onChange: (v: number) => void
}

export const ExampleKnob = ({ label, value, onChange }: ExampleKnobProps) => {
  // adjust exact 0 to to correct position of knob
  //const fixedValue = value === 0 ? 0.000001 : value;
  return (
    <div className="flex flex-col items-center">
      <p className="w-16 pb-2 pl-0.75 text-nowrap">{label}</p>
      <Knob
        size={60}
        angleOffset={220}
        angleRange={280}
        min={-12}
        max={12}
        steps={24}
        snap
        value={value}
        onChange={onChange}
      >
        {/* If Knob.value is exactly zero, Pointer starts in the wrong place */}
        <Arc
          arcWidth={2}
        />
        <circle r="22" cx="30" cy="30" />
        <Pointer
          width={3}
          height={12}
          radius={10}
          type="rect"
          color="white"
        />
      </Knob>
    </div>
  );
};

export default ExampleKnob;