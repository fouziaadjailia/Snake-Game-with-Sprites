import React from 'react';
import { Head, Tail, Straight, Corner } from './Sprites';

interface SnakeProps {
  snake: Array<{
    x: number;
    y: number;
    type: string;
    direction?: string;
  }>;
}

export const Snake: React.FC<SnakeProps> = ({ snake }) => {
  const getRotation = (segment: any, index: number) => {
    if (index === 0) {
      // Head rotation
      const next = snake[index + 1];
      if (!next) return 0;
      
      if (next.y < segment.y) return 0;
      if (next.x > segment.x) return 90;
      if (next.y > segment.y) return 180;
      if (next.x < segment.x) return 270;
      return 0;
    }

    if (index === snake.length - 1) {
      // Tail rotation
      const prev = snake[index - 1];
      if (!prev) return 0;
      
      if (prev.y > segment.y) return 0;
      if (prev.x < segment.x) return 90;
      if (prev.y < segment.y) return 180;
      if (prev.x > segment.x) return 270;
      return 0;
    }

    // Body segments (straight and corner)
    const prev = snake[index - 1];
    const next = snake[index + 1];
    
    if (!prev || !next) return 0;

    if (segment.type === 'straight') {
      return prev.x !== next.x ? 90 : 0;
    }

    if (segment.type === 'corner') {
      if (prev.y < segment.y && next.x > segment.x) return 0;
      if (prev.x < segment.x && next.y < segment.y) return 90;
      if (prev.y > segment.y && next.x < segment.x) return 180;
      if (prev.x > segment.x && next.y > segment.y) return 270;
    }

    return 0;
  };

  return (
    <>
      {snake.map((segment, index) => {
        const Component = {
          head: Head,
          tail: Tail,
          straight: Straight,
          corner: Corner,
        }[segment.type];

        return (
          <div
            key={index}
            className="absolute transition-all duration-150"
            style={{
              width: `${100 / 20}%`,
              height: `${100 / 20}%`,
              left: `${(segment.x * 100) / 20}%`,
              top: `${(segment.y * 100) / 20}%`,
              transform: `rotate(${getRotation(segment, index)}deg)`,
            }}
          >
            <Component />
          </div>
        );
      })}
    </>
  );
};