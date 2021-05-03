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

const link = {
    color: "rgb(0, 120, 212)",
    fontSize: 14
};

interface ObjectVisualizerConfigs {
    defaultExpandLevels?: number;
    defaultExpandObjectSizeLimit?: number;
}

interface ObjectVisualizerProps {
    object: any;
    configs?: ObjectVisualizerConfigs;
}

export const ObjectVisualizer = (props: ObjectVisualizerProps) => {
    return <ObjectVisualizerInternal {...props} isTop={true}></ObjectVisualizerInternal>;
};

export const ObjectVisualizerInternal = ({ object, configs, isTop }: ObjectVisualizerProps & { isTop: boolean }) => {
    const { defaultExpandLevels, defaultExpandObjectSizeLimit } = configs || {};
    const expandLevels = defaultExpandLevels === undefined ? 1 : defaultExpandLevels;
    const ObjectSizeLimit = defaultExpandObjectSizeLimit || 0;

    const isArray = object && Object.keys(object).every((x) => !isNaN(x as any));
    const isEmptyArray = isArray && Object.entries(object).length === 0;
    const isStringArray = isArray && Object.values(object).every((x) => typeof x === "string");
    const isNumberArray = isArray && Object.values(object).every((x) => typeof x === "number");
    const isObjet = object !== null && typeof object === "object" && !isArray;
    const isSmallArrayOrObject = (isArray || isObjet) && JSON.stringify(object).length < ObjectSizeLimit;
    const items = object ? Object.entries(object).filter((x) => x[1] !== undefined) : [];
    const showLink = !!object && !isEmptyArray;
    const [expand, setExpand] = useState(expandLevels > 0 || isSmallArrayOrObject);

    let collapsedContentType = "";
    if (isObjet) {
        collapsedContentType = "object";
    } else if (isArray) {
        const length = Object.values(object).length;
        collapsedContentType = `${isStringArray ? "string" : isNumberArray ? "number" : "object"}[${length}]`;
    }

    return (
        <>
            <div style={expand ? {} : hide}>
                <table style={table}>
                    {items.map((item) => (
                        <tr key={item[0]}>
                            {!isArray && <td style={cell}>{item[0]}</td>}
                            <td style={cell}>
                                {typeof item[1] === "object"
                                    ? ObjectVisualizerInternal({
                                          object: item[1],
                                          configs: {
                                              ...configs,
                                              defaultExpandLevels: isSmallArrayOrObject
                                                  ? expandLevels
                                                  : expandLevels - 1, // if object is small, we just keep expanding
                                              defaultExpandObjectSizeLimit:
                                                  defaultExpandLevels > 0 ? defaultExpandObjectSizeLimit : 0 // we only want to apply defaultExpandObjectSizeLimit on top levels
                                          },
                                          isTop: false
                                      })
                                    : JSON.stringify(item[1])}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            {showLink && !isTop && (
                <>
                    <div style={{ textAlign: "left" }}>
                        <a style={link} onClick={() => setExpand(!expand)}>
                            {expand ? "collapse" : "expand " + collapsedContentType}
                        </a>
                    </div>
                </>
            )}
        </>
    );
};
