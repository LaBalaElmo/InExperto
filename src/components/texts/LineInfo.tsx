import { ReactNode } from "react";

export type LineInfoProps = {
    title: string;
    children: ReactNode;
};
export function LineInfo({ title, children }: LineInfoProps) {
    return (
        <div className="flex gap-2 items-center justify-between">
            <h3 className="text-blue-900 font-semibold text-base">{title}</h3>
            {children}
        </div>
    );
}
