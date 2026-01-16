type PainCardProps = {
  text: string;
  align?: "left" | "center" | "right";
};

export default function PainCard({ text, align = "center" }: PainCardProps) {
  return (
    <div
      className="
        relative
        h-[239px]
        w-[342px]
        rounded-[40px]
        bg-white/70
        p-10
        backdrop-blur-[28px]
        shadow-[0_10px_46px_rgba(255,255,255,0.8)]
      "
    >
      {/* 원형 장식 */}
      <div
        className="
          absolute
          left-10
          top-10
          h-12
          w-12
          rounded-full
          bg-[#E6DFFE]
          opacity-50
          shadow-[4px_4px_4px_rgba(200,187,246,0.25)]
        "
      />

      <p
        className="
          mt-[56px]
          text-[20px]
          font-medium
          leading-[138%]
          text-[#545657]
        "
      >
        {text}
      </p>
    </div>
  );
}