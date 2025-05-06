import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[40vh] gap-5 text-white">
        <div className="font-bold flex justify-center items-center gap-4 text-3xl">Buy me a Chai <span><img src="/tea.gif" width={80} alt="" /></span></div>
        <p>This website is a crowdfunding platform for Creators.Get funded by your fans and followers.</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Start Here</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-40 "></div>

      <div className="text-white container mx-auto py-14">
        <h2 className="text-3xl font-bold text-center my-10">Your Fans can Buy you a Chai.</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-3" src="/man.gif" width={90} alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-3" src="/coin.gif" width={90} alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-3" src="/group.gif" width={90} alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-40 "></div>

      <div className="text-white flex flex-col justify-center items-center container mx-auto py-14">
        <h2 className="text-3xl font-bold text-center my-10">Learn more About Us</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=LSFZxGPSIeb1RtgX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
