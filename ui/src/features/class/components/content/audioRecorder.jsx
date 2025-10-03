import { useState, useRef } from "react";
import Mic from "../../../../assets/icons/mic.svg?react";
import { blobToBase64 } from "../../../../utils/utils";

const AUDIO_MIME_TYPE = "audio/webm";

export default function AudioRecorder({ data, save }) {
  const [isRecording, setIsRecording] = useState(false);
  // const [audioURL, setAudioURL] = useState(data?.content ? URL.createObjectURL|| null);
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

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: AUDIO_MIME_TYPE,
        });
        // const newAudioURL = URL.createObjectURL(audioBlob);

        // setAudioURL(newAudioURL);
        setIsRecording(false);
        const audioBase64 = await blobToBase64(audioBlob);

        save({ content: audioBase64 });

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
    save(null);
  };

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
            Veuillez autoriser l'accès au microphone pour enregistrer.
          </span>
        </div>
      )}

      {data.content ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <audio src={data.content} controls className="w-full"></audio>
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
            disabled={isPermissionDenied}
          >
            {isRecording ? (
              <Mic className="h-6 w-6 text-red-500 bg-transparent" />
            ) : (
              <Mic className="h-6 w-6 text-blue-500 bg-white" />
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
