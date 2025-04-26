'use client';

import { useState, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
}

export const Slider = ({
  min,
  max,
  step = 1,
  values,
  onChange,
}: SliderProps) => {
  const [localValues, setLocalValues] = useState<[number, number]>(values);

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleChange = (index: 0 | 1, value: number) => {
    const newValues = [...localValues] as [number, number];
    
    if (index === 0) {
      // Ensure min <= max
      newValues[0] = Math.min(value, localValues[1]);
    } else {
      // Ensure max >= min
      newValues[1] = Math.max(value, localValues[0]);
    }
    
    setLocalValues(newValues);
    onChange(newValues);
  };

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="relative h-10">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-200 dark:bg-gray-700">
        <div
          className="absolute h-full bg-blue-500"
          style={{
            left: `${getPercentage(localValues[0])}%`,
            width: `${getPercentage(localValues[1]) - getPercentage(localValues[0])}%`,
          }}
        ></div>
      </div>

      {[0, 1].map((index) => (
        <input
          key={index}
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[index as 0 | 1]}
          onChange={(e) => handleChange(index as 0 | 1, Number(e.target.value))}
          className="absolute top-0 w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0"
        />
      ))}
    </div>
  );
};
