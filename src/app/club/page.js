import Arsenal from "../../../public/img/arsenal_img.png";
import Stadium from "../../../public/icons/stadium_icon.png";
import Stadium_img from "../../../public/img/stadium_img.jpg";
import Manager from "../../../public/img/manager_img.png";
import Home from "../../../public/img/home_img.png";
import Away from "../../../public/img/away_img.png";
import Third from "../../../public/img/third_img.png";
import Trophy from "../../../public/icons/trophy.png";
import Map from "../../components/Map/map";

export default function ClubPage() {
  return (
    <main className="h-fit">
      <div className="rounded-lg mb-11">
        <h2 className="text-4xl font-extrabold mb-5 uppercase">History</h2>
        <p className="text-2xl text-justify">
          Arsenal have played in the top division of English football since
          1913, which is the longest unbroken run in the history of English
          football. Arsenal are the
          <span className="text-red-500"> only team </span>
          to have finished a Premier League season undefeated (2003/04).
        </p>
      </div>
      <div className="text-black font-semibold rounded-lg mb-11 h-40 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold uppercase mb-6">
          Nickname:
          <span className="text-red-500 font-extrabold capitalize">
            &nbsp;&nbsp;The Gunners
          </span>
        </h2>
        <h2 className="text-4xl font-extrabold uppercase text-right">
          Founded:
          <span className="text-red-500 font-extrabold capitalize">
            &nbsp;&nbsp;1886
          </span>
        </h2>
      </div>
      <div className="text-black grid grid-cols-2 gap-2 rounded-lg h-72 overflow-hidden mb-11">
        <div className="flex items-center justify-center bg-[#E63946] border-none rounded-r-lg">
          <img src={Arsenal.src} alt="Arsenal" className="block w-32 h-auto" />
        </div>
        <div className="p-4">
          <h2 className="uppercase text-4xl font-semibold mb-5">logo</h2>
          <p className="text-2xl text-justify">
            Arsenal's logo reflects its roots in Woolwich, home to several
            military hospitals, the Royal Arsenal, and the Royal Artillery
            Regiment.
          </p>
        </div>
      </div>
      <div className="text-white font-semibold grid grid-cols-2 gap-2 rounded-lg mb-11 p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Stadium.src}
                alt="Stadium"
                className="block w-20 h-auto"
              />
              <p className="font-medium text-black">Stadium location</p>
              <p className="font-medium text-black">
                Hornsey Rd, London N7 7AJ, UK
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Stadium.src}
                alt="Stadium"
                className="block w-20 h-auto"
              />
              <p className="font-medium text-black">Stadium capacity</p>
              <p className="font-medium text-black">59,867</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row-reverse">
            <h2 className="rounded-lg p-3 text-2xl font-semibold text-black">
              STADIUM:{" "}
              <span className="text-red-500 font-extrabold capitalize">
                Emirates Stadium
              </span>
            </h2>
          </div>
          <div className="flex flex-row-reverse">
            <img
              src={Stadium_img.src}
              alt="Stadium_img"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="text-white font-semibold grid grid-cols-2 gap-2 rounded-lg mb-11">
        <div>
          <img src={Manager.src} alt="Manager" className="w-full rounded-lg" />
        </div>
        <div className="rounded-lg p-3 text-black font-semibold">
          <h2 className="rounded-lg text-2xl uppercase  font-semibold mb-4">
            Manager:
          </h2>
          <h2>Mikel Arteta</h2>
          <h2>
            Start: <span className="text-red-500">December 2019</span> 
          </h2>
        </div>
      </div>
      <div className="mb-11">
        <p className="font-semibold text-2xl">
          Kits: <span className="text-red-500">2023 / 2024</span> 
        </p>
        <div className="bg-[#E63946] p-4 rounded-lg grid grid-cols-3 gap-3 mb-11 h-72">
          <div className="flex items-center justify-center">
            <img src={Home.src} alt="Home" className="w-2/4 rounded-lg" />
          </div>
          <div className="flex items-center justify-center">
            <img src={Away.src} alt="Away" className="w-2/4 rounded-lg" />
          </div>
          <div className="flex items-center justify-center">
            <img src={Third.src} alt="Third" className="w-2/4 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mb-11">
        <h2 className="font-semibold text-2xl">Honours</h2>
        <div className="bg-[#E63946] p-4 rounded-lg grid grid-cols-5 gap-5 h-72">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p className="font-medium text-white">First Division Champions:</p>
              <p className="font-medium text-white">13 times</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p className="font-medium text-white">FA Cup Winners:</p>
              <p className="font-medium text-white">14 times (a record)</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p className="font-medium text-white">League Cup Winners:</p>
              <p className="font-medium text-white">1986/87 & 1992/93</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p className="font-medium text-white">UEFA Cup Winners:</p>
              <p className="font-medium text-white">1993/94</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p className="font-medium text-white">Premier League best finish:</p>
              <p className="font-medium text-white">1997/98, 2001/02 & 2003/04</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg mb-11">
        <h2 className="font-semibold text-2xl">
          Where is <span className="text-red-500">Arsenal?</span>
        </h2>
        <div className="rounded-lg overflow-hidden">
          <div className="h-72">
            <div className="flex items-center justify-center">
              {/* <Map /> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg">
          Credit to&nbsp;
          <a
            href="https://premierskillsenglish.britishcouncil.org/clubs/arsenal#:~:text=Arsenal%20was%20formed%20in%201886,the%20top%20level%20since%201913."
            target="_blank"
            className="font-semibold"
          >
            premierskillenglish&nbsp;
          </a>
          and&nbsp;
          <a
            href="https://www.premierleague.com/home"
            target="_blank"
            className="font-semibold"
          >
            premierleague
          </a>
        </p>
      </div>
    </main>
  );
}
