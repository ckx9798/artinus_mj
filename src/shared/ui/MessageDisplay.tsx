interface MessageDisplayProps {
  title: string;
  description?: string;
}

const MessageDisplay = ({ title, description }: MessageDisplayProps) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-neutral-700">{title}</h2>
      {description && <p className="mt-2 text-neutral-500">{description}</p>}
    </div>
  );
};

export default MessageDisplay;
