import { useState, useRef } from "react";

const AUDIO_MIME_TYPE = "audio/webm";

export default function AudioRecorder({ data, save }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(data?.audioURL || null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsPermissionDenied(false);

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: AUDIO_MIME_TYPE,
      });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: AUDIO_MIME_TYPE,
        });
        const newAudioURL = URL.createObjectURL(audioBlob);

        setAudioURL(newAudioURL);
        setIsRecording(false);

        save({ audioURL: newAudioURL, audioBlob: audioBlob });

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erreur lors de l'accès au microphone :", err);
      setIsPermissionDenied(true);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    save({ audioURL: null, audioBlob: null });
  };

  const buttonStyle = `
    p-4 rounded-full text-white transition-colors duration-200
    ${
      isRecording
        ? "bg-red-500 hover:bg-red-600"
        : "bg-blue-500 hover:bg-blue-600"
    }
  `;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Enregistreur Audio
      </h3>

      {isPermissionDenied && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Accès refusé !</strong>
          <span className="block sm:inline">
            {" "}
            Veuillez autoriser l'accès au microphone pour enregistrer.
          </span>
        </div>
      )}

      {audioURL ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <audio src={audioURL} controls className="w-full"></audio>
          <button
            onClick={deleteRecording}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-24">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={buttonStyle}
            disabled={isPermissionDenied}
          >
            {isRecording ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                <path
                  fillRule="evenodd"
                  d="M3.666 8.59c.28-.415 1.01-1.076 1.72-1.424C7.755 5.5 10 5 10 5s2.245.5 4.614 2.166c.71.348 1.44.975 1.72 1.424a1 1 0 01-.157 1.55l-1.92 1.28-1.92-1.28c-.14-.094-.3-.15-.46-.178-.29-.05-.59.043-.84.257-.16.13-.3.3-.4.48-.15.2-.28.42-.4.65-.12.23-.23.47-.32.73a.87.87 0 00-.08.24c-.05.15-.08.31-.08.47 0 .16.03.32.08.47.07.2.16.4.28.58l.4.58.4.58a1 1 0 01-.4.4a1 1 0 01-.4-.4l-.4-.58-.4-.58a.87.87 0 00-.08-.24c-.05-.15-.08-.31-.08-.47 0-.16.03-.32.08-.47.07-.2.16-.4.28-.58l.4-.58.4-.58zM10 18a8 8 0 100-16 8 8 0 000 16z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <span className="mt-2 text-sm text-gray-500">
            {isRecording
              ? "Enregistrement en cours..."
              : "Cliquez pour démarrer l'enregistrement"}
          </span>
        </div>
      )}
    </div>
  );
}
