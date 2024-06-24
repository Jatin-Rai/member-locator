import Image from "next/image";

/**
 * ImageAvatar component
 * 
 * This component displays either a user's photo or their initial inside a styled div.
 * 
 * @param {string} photo - URL of the user's photo.
 * @param {string} fullName - Full name of the user.
 * @param {number} size - Size of the avatar.
 * @param {Function} onClick - Click handler function.
 */
const ImageAvatar = ({ photo, fullName, border, size = 40, onClick }) => (
    photo ? (
        <Image
            src={photo}
            alt={`Photo of ${fullName}`}
            className={`rounded-full ${border ? "border-2 border-blue-400" : ""} cursor-pointer`}
            width={size}
            height={size}
            onClick={onClick}
        />
    ) : (
        <div
            className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-xl cursor-pointer"
            style={{ width: size, height: size }}
            onClick={onClick}
        >
            {fullName.charAt(0)}
        </div>
    )
);

export default ImageAvatar;
