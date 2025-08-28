import React, { useState, useEffect, isValidElement } from 'react';
import useUpdate from './useUpdate';
import { Arc } from './Arc';
import { Pointer } from './Pointer';
import { Scale } from './Scale';
import { Value } from './Value';
import { Range } from './Range';
import { Spiral } from './Spiral';
import { Label } from './Label';
import type { InteractiveHook } from 'types';

const isInternalComponent = ({ type }: { type: any }) =>
    type === Arc ||
    type === Pointer ||
    type === Scale ||
    type === Value ||
    type === Range ||
    type === Spiral ||
    type === Label;

interface Props {
    min: number;
    max: number;
    initialValue?: number | null; // For uncontrolled mode
    value?: number | null; // For controlled mode
    multiRotation?: boolean;
    angleOffset?: number;
    angleRange?: number;
    size: number;
    onChange?: (value: number) => void; // Required for controlled mode
    onInteractiveChange?: (value: number) => void;
    interactiveHook?: InteractiveHook;
    onStart?: () => void;
    onEnd?: () => void;
    steps?: number;
    snap?: boolean;
    tracking?: boolean;
    readOnly?: boolean;
    useMouseWheel?: boolean;
    ariaValueText?: string;
    ariaLabelledBy?: string;
    className?: string;
}

export const Knob = ({
    min,
    max,
    initialValue = null,
    value: controlledValue = null,
    multiRotation = false,
    angleOffset = 0,
    angleRange = 360,
    size,
    onChange = () => {},
    onInteractiveChange = () => {},
    interactiveHook = undefined,
    onStart = () => {},
    onEnd = () => {},
    children,
    steps,
    snap = false,
    tracking = true,
    readOnly = false,
    useMouseWheel = true,
    ariaValueText,
    ariaLabelledBy,
    className,
}: React.PropsWithChildren<Props>) => {
    // Determine if the component is controlled
    const isControlled = controlledValue !== null && controlledValue !== undefined;

    // Internal state for uncontrolled mode
    const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(initialValue);

    // Current value (controlled or uncontrolled)
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Update internal state when `initialValue` changes in uncontrolled mode
    useEffect(() => {
        if (!isControlled && initialValue !== null) {
            setUncontrolledValue(initialValue);
        }
    }, [initialValue, isControlled]);

    // Handle value changes
    const handleChange = (newValue: number) => {
        if (!isControlled) {
            setUncontrolledValue(newValue); // Update internal state in uncontrolled mode
        }
        onChange(newValue); // Notify parent in both modes
    };

    const { percentage, svg, container, onKeyDown } = useUpdate({
        min,
        max,
        value: currentValue, // Use the current value (controlled or uncontrolled)
        multiRotation,
        angleOffset,
        angleRange,
        size,
        steps: snap ? steps : undefined,
        onChange: handleChange,
        onInteractiveChange,
        interactiveHook,
        useMouseWheel,
        readOnly,
        tracking,
        onStart,
        onEnd,
    });

    return (
        <div
            ref={container}
            tabIndex={0}
            style={{ outline: 'none', width: size, height: size }}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={currentValue || 0}
            aria-valuetext={ariaValueText}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={readOnly ? undefined : onKeyDown}
            className={className}
        >
            <svg width={size} height={size} ref={svg}>
                {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    }
                    return isInternalComponent(child)
                        ? React.cloneElement(child, {
                              percentage,
                              size,
                              value: currentValue,
                              angleOffset,
                              angleRange,
                              radius: size / 2,
                              center: size / 2,
                              steps,
                              ...child.props,
                          })
                        : child;
                })}
            </svg>
        </div>
    );
};
