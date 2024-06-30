const GamesPlayerCard = ({
  contentCardIcon,
  contentCardAlt,
  contentCardTitle,
  children,
}) => {
  return (
    <>
      <div className="rounded-md border-2 border-gray-200 grid grid-rows-[50px_minmax(0,_1fr)] p-4">
        <div className="flex justify-between items-center text-lg	font-bold text-slate-700/50">
          <div>{contentCardTitle}</div>
          <img
            src={contentCardIcon}
            alt={contentCardAlt}
            className="w-6 h-auto"
          />
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </>
  );
};

export default GamesPlayerCard;
