import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[40vh] gap-5 text-white text-center px-4">
        <div className="font-bold flex justify-center items-center gap-4 text-2xl md:text-3xl">
          Buy me a Chai
          <span>
            <img src="/tea.gif" width={60} alt="chai" className="w-16 h-auto" />
          </span>
        </div>
        <p className="text-sm md:text-base">
          This website is a crowdfunding platform for Creators. Get funded by your fans and followers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-40 my-6"></div>

      <div className="text-white container mx-auto px-4 py-14">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Your Fans can Buy you a Chai.</h2>
  <div className="flex flex-col md:flex-row gap-10 justify-around items-center">
    {[
      {
        img: "/man.gif",
        title: "Fans Want to Help",
        desc: "Your supporters are here to show their appreciation."
      },
      {
        img: "/coin.gif",
        title: "Every Coin Counts",
        desc: "Even a small tip can mean a lot. Let your fans support you."
      },
      {
        img: "/group.gif",
        title: "Built by Community",
        desc: "Your community makes this journey worthwhile — one chai at a time."
      }
    ].map((item, index) => (
      <div key={index} className="item space-y-3 flex flex-col items-center justify-center max-w-xs text-center">
        <img className="bg-slate-400 rounded-full p-3 w-24 h-24" src={item.img} alt="icon" />
        <p className="font-bold">{item.title}</p>
        <p>{item.desc}</p>
      </div>
    ))}
  </div>
</div>


      <div className="bg-white h-1 opacity-40 my-6"></div>

      <div className="text-white flex flex-col justify-center items-center container mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Learn more About Us</h2>
        <div className="w-full max-w-screen-md aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=LSFZxGPSIeb1RtgX"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
