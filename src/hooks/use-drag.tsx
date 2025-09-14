import React from "react";

interface UseDragProps<T> {
  initialPosition: [number, number];
  ref: React.RefObject<T | null>;
}

interface UseDragReturn {
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  position: [number, number];
}

export const useDrag = <T extends HTMLElement>({
  initialPosition,
  ref,
}: UseDragProps<T>): UseDragReturn => {
  const [position, setPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState([0, 0]);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setDragStart([e.clientX - rect.left, e.clientY - rect.top]);
      setIsDragging(true);
      e.preventDefault();
    },
    [ref],
  );

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;

      setPosition([e.clientX - dragStart[0], e.clientY - dragStart[1]]);
    },
    [isDragging, dragStart],
  );

  const onMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    onMouseDown,
    onMouseLeave,
    onMouseMove,
    onMouseUp,
    position,
  };
};
