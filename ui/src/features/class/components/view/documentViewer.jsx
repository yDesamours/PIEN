import Icon from "../../../../components/icon/icon";
import { base64ToBlob } from "../../../../utils/utils";

export default function DocumentViewwer({ data }) {
  const iconName = data
    ? data.fileName.split(".").pop().toLowerCase().substring(0, 3)
    : "";

  let objectUrl = null;

  const preview = () => {
    const blob = base64ToBlob(data.content);
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex flex-row items-center gap-2 h-10 text-left">
      {data ? (
        <>
          <Icon name={iconName} className="w-5" />
          <p className="text-sm text-gray-700 font-medium truncate w-full flex-1">
            {data.fileName}
          </p>
          <Icon
            role="button"
            name="preview"
            onClick={preview}
            className="cursor-pointer  w-5"
          />
          <Icon role="button" name="telechargement" className="w-5" />
        </>
      ) : (
        <p>Pas de document choisi</p>
      )}
    </div>
  );
}
