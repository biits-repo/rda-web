(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_3656b650._.js", {

"[project]/src/app/BackendApi/RadiopocApi.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RadioPOCAPI": (()=>RadioPOCAPI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const RadioPOCAPI = {
    SponsorData: async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://expenseapp.creowiz.com/api/get_sponsor_names/");
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            throw "Total Registration Failed";
        }
    },
    SponsonsorOccurance: async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://expenseapp.creowiz.com/api/get_sponsor_occurence/");
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            throw "Sponsor Occurrence Failed";
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/Components/ChatBot.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// "use client";
// import { useEffect, useRef, useState } from "react";
// const Chatbot = ({ page }) => {
//   const scrollref = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState(null);
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim() === "") return;
//     setMessages([...messages, { text: input, type: "user" }]);
//     setInput("");
//   };
//   useEffect(() => {
//     scrollref?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
//   const handleFileUpload = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setMessages([
//         ...messages,
//         { text: `Uploaded: ${uploadedFile.name}`, type: "user" },
//       ]);
//     }
//   };
//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
//         >
//           <span className="text-2xl">💬</span>
//         </button>
//       )}
//       {isOpen && (
//         <div className="w-96 max-w-full p-4 border border-gray-300 rounded-lg bg-white shadow-lg transition-all duration-300">
//           <div className="bg-gray-400 text-black py-2">
//             <div className="pl-3.5 font-bold">{page}</div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-6 right-6 bg-white rounded-full text-gray-600 "
//             >
//               ✖
//             </button>
//           </div>
//           <div className="flex flex-col space-y-3">
//             <div className="overflow-y-auto h-80 p-2">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`text-sm ${
//                     message.type === "user"
//                       ? "text-blue-600 text-right "
//                       : "text-gray-800"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               ))}
//               <div ref={scrollref} />
//             </div>
//             {/* Input area */}
//             <form onSubmit={handleSendMessage} className="flex space-x-2">
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-lg text-sm"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="p-2 bg-blue-600 text-white rounded-lg"
//               >
//                 Send
//               </button>
//             </form>
//             {/* File upload input */}
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="mt-2 p-2 border rounded-lg text-sm"
//             />
//             {file && (
//               <div className="text-sm mt-2 text-gray-600">
//                 File: {file.name}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Chatbot;
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Chatbot = ({ page, sponsorData, setSelected })=>{
    _s();
    const scrollref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSendMessage = (e)=>{
        e.preventDefault();
        if (input.trim() === "") return;
        setMessages([
            ...messages,
            {
                text: input,
                type: "user"
            }
        ]);
        processMessage(input);
        setInput("");
    };
    const processMessage = (message)=>{
        const lowerMessage = message.toLowerCase();
        // Check if message contains "sponsor data"
        if (lowerMessage.includes("sponsor data")) {
            if (lowerMessage.includes("all")) {
                // Show all sponsors
                const allSponsors = sponsorData.map((sponsor)=>({
                        label: sponsor.name,
                        value: sponsor.id
                    }));
                setSelected(allSponsors);
                setMessages((messages)=>[
                        ...messages,
                        {
                            text: "Showing data for all sponsors",
                            type: "bot"
                        }
                    ]);
            } else {
                // Look for specific sponsor names in the message
                const requestedSponsors = [];
                sponsorData.forEach((sponsor)=>{
                    if (lowerMessage.includes(sponsor.name.toLowerCase())) {
                        requestedSponsors.push({
                            label: sponsor.name,
                            value: sponsor.id
                        });
                    }
                });
                if (requestedSponsors.length > 0) {
                    setSelected(requestedSponsors);
                    setMessages((messages)=>[
                            ...messages,
                            {
                                text: `Showing data for: ${requestedSponsors.map((s)=>s.label).join(", ")}`,
                                type: "bot"
                            }
                        ]);
                } else {
                    setMessages((messages)=>[
                            ...messages,
                            {
                                text: "Sorry, I couldn't find the sponsors you mentioned. Please try again with valid sponsor names.",
                                type: "bot"
                            }
                        ]);
                }
            }
        } else {
            // Default response for other inputs
            setMessages((messages)=>[
                    ...messages,
                    {
                        text: "Try asking for sponsor data. For example: 'sponsor data: Hyundai' or 'sponsor data: all'",
                        type: "bot"
                    }
                ]);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chatbot.useEffect": ()=>{
            scrollref?.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["Chatbot.useEffect"], [
        messages
    ]);
    const handleFileUpload = (e)=>{
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setMessages([
                ...messages,
                {
                    text: `Uploaded: ${uploadedFile.name}`,
                    type: "user"
                }
            ]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: page == "Sponsor Data" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-5 right-5 z-50",
            children: [
                !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsOpen(true),
                    className: "w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl",
                        children: "💬"
                    }, void 0, false, {
                        fileName: "[project]/src/Components/ChatBot.js",
                        lineNumber: 220,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/Components/ChatBot.js",
                    lineNumber: 216,
                    columnNumber: 13
                }, this),
                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-96 max-w-full p-4 border border-gray-300 rounded-lg bg-white shadow-lg transition-all duration-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-400 text-black py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pl-3.5 font-bold",
                                    children: page
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsOpen(false),
                                    className: "absolute top-6 right-6 bg-white rounded-full text-gray-600 ",
                                    children: "✖"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 228,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/ChatBot.js",
                            lineNumber: 226,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-y-auto h-80 p-2",
                                    children: [
                                        messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 text-sm italic",
                                            children: [
                                                "Try asking for sponsor data. Examples:",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/Components/ChatBot.js",
                                                    lineNumber: 240,
                                                    columnNumber: 23
                                                }, this),
                                                "- sponsor data: Hyundai",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/Components/ChatBot.js",
                                                    lineNumber: 241,
                                                    columnNumber: 23
                                                }, this),
                                                "- sponsor data: all",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/Components/ChatBot.js",
                                                    lineNumber: 242,
                                                    columnNumber: 23
                                                }, this),
                                                "- sponsor data: Honda, Toyota"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/ChatBot.js",
                                            lineNumber: 238,
                                            columnNumber: 21
                                        }, this),
                                        messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-sm mb-2 p-2 rounded-lg ${message.type === "user" ? "text-white bg-blue-600 ml-auto max-w-[80%] break-words " : "text-black bg-gray-200 mr-auto max-w-[80%] break-words"}`,
                                                children: message.text
                                            }, index, false, {
                                                fileName: "[project]/src/Components/ChatBot.js",
                                                lineNumber: 246,
                                                columnNumber: 21
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: scrollref
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/ChatBot.js",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 236,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSendMessage,
                                    className: "flex space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "w-full p-2 border rounded-lg text-sm",
                                            placeholder: "Type 'sponsor data: Hyundai' or 'sponsor data: all'...",
                                            value: input,
                                            onChange: (e)=>setInput(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/ChatBot.js",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "p-2 bg-blue-600 text-white rounded-lg",
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/ChatBot.js",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 260,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    onChange: handleFileUpload,
                                    className: "mt-2 p-2 border rounded-lg text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 276,
                                    columnNumber: 17
                                }, this),
                                file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm mt-2 text-gray-600",
                                    children: [
                                        "File: ",
                                        file.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/ChatBot.js",
                                    lineNumber: 282,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/ChatBot.js",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/Components/ChatBot.js",
                    lineNumber: 225,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/Components/ChatBot.js",
            lineNumber: 214,
            columnNumber: 9
        }, this)
    }, void 0, false);
};
_s(Chatbot, "SDOzw90BPrYbkINU3JMfb+733N4=");
_c = Chatbot;
const __TURBOPACK__default__export__ = Chatbot;
var _c;
__turbopack_context__.k.register(_c, "Chatbot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/Components/SponsorDataGraph.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// "use client";
// import React, { useEffect, useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// import { Bar } from "react-chartjs-2";
// import { RadioPOCAPI } from "@/app/BackendApi/RadiopocApi";
// import Chatbot from "./ChatBot";
// function SponsorDataGraph() {
//   const [selected, setSelected] = useState([]);
//   const [sponsorData, setSponsorData] = useState([]);
//   const [occurrences, setOccurrences] = useState([]);
//   useEffect(() => {
//     ApiFetching();
//   }, []);
//   const ApiFetching = async () => {
//     const SponsorRes = await RadioPOCAPI.SponsorData();
//     const OccurrencesRes = await RadioPOCAPI.SponsonsorOccurance();
//     if (SponsorRes) {
//       setSponsorData(SponsorRes?.data);
//     }
//     if (OccurrencesRes) {
//       setOccurrences(OccurrencesRes?.data);
//     }
//   };
//   const formattedOptions = sponsorData?.map((option) => ({
//     label: option.name,
//     value: option.id,
//   }));
//   const chartLabels = [];
//   const chartData = [];
//   selected.forEach((item) => {
//     const sponsorOccurrences = occurrences.filter(
//       (occurrence) => occurrence.sponsor_id === item.value
//     );
//     const totalOccurrences = sponsorOccurrences.reduce(
//       (sum, occ) => sum + occ.sponsor_occurence,
//       0
//     );
//     chartLabels.push(item.label);
//     chartData.push(totalOccurrences);
//   });
//   const data = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Sponsor Occurrences",
//         data: chartData,
//         backgroundColor: "#2270c3",
//         borderColor: "#4e73df",
//         borderWidth: 1,
//         barThickness: 50,
//       },
//     ],
//   };
//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };
//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-semibold mb-4">Select Sponsors</h1>
//       <MultiSelect
//         options={formattedOptions}
//         value={selected}
//         onChange={setSelected}
//         labelledBy="Select"
//       />
//       <div className="grid grid-cols-12 h-[40rem]">
//         <div className="col-span-3 mt-5">
//           {selected.map((item) => (
//             <div key={item.value} className="flex items-center space-x-3 mb-2">
//               <span className="text-blue-600">{item.label}</span>
//               <button
//                 onClick={() =>
//                   setSelected(selected.filter((i) => i.value !== item.value))
//                 }
//                 className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="col-span-9 bg-gray-300">
//           <div>
//             {selected?.length > 0 ? (
//               <Bar data={data} options={options} />
//             ) : (
//               <div className="text-center text-lg font-bold text-gray-600 flex justify-center items-center h-[40rem]">
//                 <p>Select At Least One Sponsor to show the graph</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Chatbot page={"sponsordata"} />
//     </div>
//   );
// }
// export default SponsorDataGraph;
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$multi$2d$select$2d$component$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-multi-select-component/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$BackendApi$2f$RadiopocApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/BackendApi/RadiopocApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$ChatBot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Components/ChatBot.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BarElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Title"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
;
;
;
function SponsorDataGraph() {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sponsorData, setSponsorData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [occurrences, setOccurrences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SponsorDataGraph.useEffect": ()=>{
            ApiFetching();
        }
    }["SponsorDataGraph.useEffect"], []);
    const ApiFetching = async ()=>{
        const SponsorRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$BackendApi$2f$RadiopocApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioPOCAPI"].SponsorData();
        const OccurrencesRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$BackendApi$2f$RadiopocApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioPOCAPI"].SponsonsorOccurance();
        if (SponsorRes) {
            setSponsorData(SponsorRes?.data);
        }
        if (OccurrencesRes) {
            setOccurrences(OccurrencesRes?.data);
        }
    };
    const formattedOptions = sponsorData?.map((option)=>({
            label: option.name,
            value: option.id
        }));
    const chartLabels = [];
    const chartData = [];
    selected.forEach((item)=>{
        const sponsorOccurrences = occurrences.filter((occurrence)=>occurrence.sponsor_id === item.value);
        const totalOccurrences = sponsorOccurrences.reduce((sum, occ)=>sum + occ.sponsor_occurence, 0);
        chartLabels.push(item.label);
        chartData.push(totalOccurrences);
    });
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "Sponsor Occurrences",
                data: chartData,
                backgroundColor: "#2270c3",
                borderColor: "#4e73df",
                borderWidth: 1,
                barThickness: 50
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold mb-4",
                children: "Select Sponsors"
            }, void 0, false, {
                fileName: "[project]/src/Components/SponsorDataGraph.js",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$multi$2d$select$2d$component$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MultiSelect"], {
                options: formattedOptions,
                value: selected,
                onChange: setSelected,
                labelledBy: "Select"
            }, void 0, false, {
                fileName: "[project]/src/Components/SponsorDataGraph.js",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 h-[40rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-3 mt-5",
                        children: selected.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/Components/SponsorDataGraph.js",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelected(selected.filter((i)=>i.value !== item.value)),
                                        className: "bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none",
                                        children: "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/Components/SponsorDataGraph.js",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.value, true, {
                                fileName: "[project]/src/Components/SponsorDataGraph.js",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/Components/SponsorDataGraph.js",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-9 bg-gray-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: selected?.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                data: data,
                                options: options
                            }, void 0, false, {
                                fileName: "[project]/src/Components/SponsorDataGraph.js",
                                lineNumber: 246,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-lg font-bold text-gray-600 flex justify-center items-center h-[40rem]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Select At Least One Sponsor to show the graph"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/SponsorDataGraph.js",
                                    lineNumber: 249,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/Components/SponsorDataGraph.js",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/Components/SponsorDataGraph.js",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/Components/SponsorDataGraph.js",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/Components/SponsorDataGraph.js",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$ChatBot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                page: "Sponsor Data",
                sponsorData: sponsorData,
                setSelected: setSelected
            }, void 0, false, {
                fileName: "[project]/src/Components/SponsorDataGraph.js",
                lineNumber: 255,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/Components/SponsorDataGraph.js",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_s(SponsorDataGraph, "8zuyZrOU0Jb50HdH1Fd2l26UIRs=");
_c = SponsorDataGraph;
const __TURBOPACK__default__export__ = SponsorDataGraph;
var _c;
__turbopack_context__.k.register(_c, "SponsorDataGraph");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_3656b650._.js.map