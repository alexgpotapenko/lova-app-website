"use client";

import Iphone from "@/components/Iphone";

const WRAPPER_WIDTH = 460;
const WRAPPER_HEIGHT = 960;
const PHONE_SCALE = 0.75;
const BOX_SIZE = 104;

const POINT_B_X = WRAPPER_WIDTH / 2;
const POINT_A_LEFT_X = 0 - 80 - 64;
const POINT_A_RIGHT_X = WRAPPER_WIDTH + 80 + 64;
// iPhone внутри компонента уменьшен через scale(0.75), origin-top.
// Поэтому визуальный центр по Y не 480, а 960*0.75/2 = 360.
const CENTER_Y = (WRAPPER_HEIGHT * PHONE_SCALE) / 2;
const Y_OFFSETS = [-280, 0, 280];
const EDGE_ROWS_PULL_PX = 40;

const LEFT_A_TO_B_PX = POINT_B_X - POINT_A_LEFT_X;
const RIGHT_A_TO_B_PX = POINT_B_X - POINT_A_RIGHT_X;

type Props = { progress: number };

/**
 * Иконки A → B. Обычные div + progress (number) в style. Без Framer Motion.
 */
export default function HeroAnimation({ progress }: Props) {
  const leftCenterX = POINT_A_LEFT_X + progress * LEFT_A_TO_B_PX;
  const rightCenterX = POINT_A_RIGHT_X + progress * RIGHT_A_TO_B_PX;
  const opacity = 1 - progress;

  return (
    <div className="relative inline-block w-[460px] h-[960px]">
      <Iphone />
      {Y_OFFSETS.map((offsetY, idx) => (
        <div
          key={`left-${idx}`}
          className="absolute flex items-center justify-center rounded-[2px] bg-[#ececec] text-[48px] font-semibold text-black"
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            left: leftCenterX + (idx === 1 ? 0 : EDGE_ROWS_PULL_PX),
            top: CENTER_Y + offsetY,
            transform: "translate(-50%, -50%)",
            opacity,
          }}
        >
          {idx + 1}
        </div>
      ))}
      {Y_OFFSETS.map((offsetY, idx) => (
        <div
          key={`right-${idx}`}
          className="absolute flex items-center justify-center rounded-[2px] bg-[#ececec] text-[48px] font-semibold text-black"
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            left: rightCenterX - (idx === 1 ? 0 : EDGE_ROWS_PULL_PX),
            top: CENTER_Y + offsetY,
            transform: "translate(-50%, -50%)",
            opacity,
          }}
        >
          {idx + 4}
        </div>
      ))}
    </div>
  );
}
