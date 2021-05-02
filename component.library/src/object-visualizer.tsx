import React, { useState } from "react";

const table = {
    borderCollapse: "collapse",
    tableLayout: "fixed"
} as any;

const cell = {
    border: "1px solid #dddddd",
    maxWidth: "100%",
    textAlign: "left",
    padding: "8px"
} as any;

const hide = {
    display: "none"
} as any;

interface IDataViewerProps {
    data: any;
    expand: boolean;
}

export const ObjectVisualizer = ({ data, expand: defaultExpand }: IDataViewerProps) => {
    const [expand, setExpand] = useState(defaultExpand);
    const isArray = data && Object.keys(data).every((x) => !isNaN(x as any));
    const isObjet = data !== null && typeof data === "object" && !isArray;
    const items = data ? Object.entries(data).filter((x) => x[1] !== undefined) : [];
    const isStringArray = isArray && Object.values(data).every((x) => typeof x === "string");
    return (
        <>
            <div style={!expand ? hide : {}}>
                {isStringArray ? (
                    JSON.stringify(Object.values(data))
                ) : (
                    <table style={table}>
                        {items.map((item) => (
                            <tr key={item[0]}>
                                {!isArray && <td style={cell}>{item[0]}</td>}
                                <td style={cell}>
                                    {typeof item[1] === "object"
                                        ? ObjectVisualizer({ data: item[1], expand: false })
                                        : JSON.stringify(item[1])}
                                </td>
                            </tr>
                        ))}
                    </table>
                )}
            </div>
            {isObjet && !defaultExpand && (
                <a style={{ fontSize: 14 }} onClick={() => setExpand(!expand)}>
                    {expand ? "collapse" : "expand"}
                </a>
            )}
        </>
    );
};
