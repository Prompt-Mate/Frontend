import  Union  from "@/assets/icons/Union.svg";
import {IconButton} from "@/components/IconButton";
import ScreenFullIcon from "@/assets/icons/iconamoon_screen-full-light.svg"

export function EvaluationHeader() {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <Union className="h-5 w-5 text-ui-icon" />

                {/* 남는 공간은 텍스트가 차지 */}
                <span className="min-w-0 flex-1 text-body font-medium text-ui-textMuted">
          PromptMate의 한줄평
        </span>
                <IconButton> <ScreenFullIcon className="w-[26px] h-[26px] text-ui-icon" /> </IconButton>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3">
                <div />
                <p className="text-sectionTitle font-bold text-ui-text leading-[1.44]">
                    테이님은 창의적인 컨셉을 잘 활용하고 계시네요!
                    <br />
                    조명 조건을 조금만 명확히 하면 AI가 의도를 훨씬…
                </p>
            </div>
        </section>
    );
}









