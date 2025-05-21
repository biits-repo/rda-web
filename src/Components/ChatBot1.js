"use client";
import { useEffect, useRef, useState } from "react";

const Chatbot1 = ({ page, sponsorData, setSelected }) => {
  const scrollref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, type: "user" }]);
    processMessage(input);

    setInput("");
  };

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check if message contains "sponsor data"
    if (lowerMessage.includes("sponsor data")) {
      if (lowerMessage.includes("all")) {
        // Show all sponsors
        const allSponsors = sponsorData.map((sponsor) => ({
          label: sponsor.name,
          value: sponsor.id,
        }));
        setSelected(allSponsors);

        setMessages((messages) => [
          ...messages,
          {
            text: "Showing data for all sponsors",
            type: "bot",
          },
        ]);
      } else {
        // Look for specific sponsor names in the message
        const requestedSponsors = [];

        sponsorData.forEach((sponsor) => {
          if (lowerMessage.includes(sponsor.name.toLowerCase())) {
            requestedSponsors.push({
              label: sponsor.name,
              value: sponsor.id,
            });
          }
        });

        if (requestedSponsors.length > 0) {
          setSelected(requestedSponsors);

          setMessages((messages) => [
            ...messages,
            {
              text: `Showing data for: ${requestedSponsors
                .map((s) => s.label)
                .join(", ")}`,
              type: "bot",
            },
          ]);
        } else {
          setMessages((messages) => [
            ...messages,
            {
              text: "Sorry, I couldn't find the sponsors you mentioned. Please try again with valid sponsor names.",
              type: "bot",
            },
          ]);
        }
      }
    } else {
      // Default response for other inputs
      setMessages((messages) => [
        ...messages,
        {
          text: "Try asking for sponsor data. For example: 'sponsor data: Hyundai' or 'sponsor data: all'",
          type: "bot",
        },
      ]);
    }
  };

  useEffect(() => {
    scrollref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setMessages([
        ...messages,
        { text: `Uploaded: ${uploadedFile.name}`, type: "user" },
      ]);
    }
  };

  return (
    <>
      {page == "Sponsor Data" && (
        <div className="fixed bottom-5 right-5 z-50">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">💬</span>
            </button>
          )}

          {isOpen && (
            <div className="w-96 max-w-full p-4 border border-gray-300 rounded-lg bg-white shadow-lg transition-all duration-300">
              <div className="bg-gray-400 text-black py-2">
                <div className="pl-3.5 font-bold">{page}</div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 bg-white rounded-full text-gray-600 "
                >
                  ✖
                </button>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="overflow-y-auto h-80 p-2">
                  {messages.length === 0 && (
                    <div className="text-gray-500 text-sm italic">
                      Try asking for sponsor data. Examples:
                      <br />- sponsor data: Hyundai
                      <br />- sponsor data: all
                      <br />- sponsor data: Honda, Toyota
                    </div>
                  )}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`text-sm mb-2 p-2 rounded-lg ${
                        message.type === "user"
                          ? "text-white bg-blue-600 ml-auto max-w-[80%] break-words "
                          : "text-black bg-gray-200 mr-auto max-w-[80%] break-words"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                  <div ref={scrollref} />
                </div>

                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder="Type 'sponsor data: Hyundai' or 'sponsor data: all'..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-lg"
                  >
                    Send
                  </button>
                </form>

                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="mt-2 p-2 border rounded-lg text-sm"
                />
                {file && (
                  <div className="text-sm mt-2 text-gray-600">
                    File: {file.name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot1;
