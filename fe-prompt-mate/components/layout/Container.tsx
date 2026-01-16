// components/layout/Container.tsx
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// 이 컨테이너 컴포넌트는 페이지 콘텐츠를 중앙에 정렬하고 최대 너비를 설정하는 데 사용됩니다.