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

interface DataViewerConfigs {
    defaultExpandLevels?: number;
    defaultExpandObjectSizeLimit?: number;
}

interface DataViewerProps {
    data: any;
    configs?: DataViewerConfigs;
}

export const ObjectVisualizer = ({ data, configs }: DataViewerProps) => {
    const { defaultExpandLevels, defaultExpandObjectSizeLimit } = configs || {};
    const expandLevels = defaultExpandLevels === undefined ? 1 : defaultExpandLevels;
    const ObjectSizeLimit = defaultExpandObjectSizeLimit || 0;

    const isArray = data && Object.keys(data).every((x) => !isNaN(x as any));
    const isEmptyArray = isArray && Object.entries(data).length === 0;
    const isObjet = data !== null && typeof data === "object" && !isArray;
    const isSmallArrayOrObject = (isArray || isObjet) && JSON.stringify(data).length < ObjectSizeLimit;
    const items = data ? Object.entries(data).filter((x) => x[1] !== undefined) : [];
    const isStringArray = isArray && Object.values(data).every((x) => typeof x === "string");
    const showLink = !!data && !isEmptyArray;
    const [expand, setExpand] = useState(expandLevels > 0 || isSmallArrayOrObject || isSmallArrayOrObject);
    return (
        <>
            <div style={expand ? {} : hide}>
                {isStringArray ? (
                    JSON.stringify(Object.values(data))
                ) : (
                    <table style={table}>
                        {items.map((item) => (
                            <tr key={item[0]}>
                                {!isArray && <td style={cell}>{item[0]}</td>}
                                <td style={cell}>
                                    {typeof item[1] === "object"
                                        ? ObjectVisualizer({
                                              data: item[1],
                                              configs: {
                                                  ...configs,
                                                  defaultExpandLevels: isSmallArrayOrObject ? 1000 : expandLevels - 1 // if object is small, we just expand to all layers
                                              }
                                          })
                                        : JSON.stringify(item[1])}
                                </td>
                            </tr>
                        ))}
                    </table>
                )}
            </div>
            {showLink && (
                <div style={{ textAlign: "left" }}>
                    <a style={{ fontSize: 14 }} onClick={() => setExpand(!expand)}>
                        {expand ? "collapse" : "expand"}
                    </a>
                </div>
            )}
        </>
    );
};
