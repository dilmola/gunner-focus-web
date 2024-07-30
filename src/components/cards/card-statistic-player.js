const CardStatisticPlayer = ({
  contentCardIcon,
  contentCardAlt,
  contentCardTitle,
  children,
}) => {
  return (
    <div className="rounded-md border border-mirageOpa01Color dark:border-romanceOpa01Color p-4">
      <div className=" flex justify-between items-center text-lg font-bold text-mirageOpa50Color dark:text-romanceOpa50Color">
        <div>{contentCardTitle}</div>
        <div className="bg-gainsboroColor dark:bg-montanaColor rounded-md p-2 relative h-6 w-6">
          <img
            src={contentCardIcon}
            alt={contentCardAlt}
            className="h-8 w-8 object-contain top-0 right-1 absolute"
          />
        </div>
      </div>
      <div className="mt-8 sm:mt-12 lg:mt-2">{children}</div>
    </div>
  );
};

export default CardStatisticPlayer;
