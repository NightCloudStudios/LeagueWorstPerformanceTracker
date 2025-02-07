export default function SearchBar() {
  //const router = useRouter(); ---------

  function formSub(formData: FormData) {
    const name = formData.get("summonerName");
    const tag = formData.get("summonerTag");
    const region = formData.get("region");
    const url = `/${region}/${name}-${tag}`;
    //nav to page
    //router.push(url); ---------
    console.log(`Searching for: ${name}#${tag} | ${region}`);
  }

  return (
    <div className="flex flex-row h-12 w-full justify-center place-self-center bg-slate-900 p-2">
      <form
        className="flex flex-row h-12 w-full md:w-2/3 lg:w-3/5 justify-center place-self-center p-2"
        action={formSub}>
        <div className="flex h-full w-auto text-end bg-slate-600 rounded-l-md">
          <select className="bg-inherit self-center" name="region">
            <option value="EUW1">EUW1</option>
            <option value="EUW2">EWU2</option>
          </select>
        </div>

        <div className="flex h-full w-full text-end bg-slate-700">
          <input
            className="bg-transparent w-full text-end pr-2 "
            id="summonerName"
            name="summonerName"
            type="text"
            placeholder="SummonerName"
            maxLength={16}
            required
          />
        </div>

        <div className="flex flex-row h-full w-36 pl-2 content-center bg-slate-700 border-l-8 border-l-orange-600">
          <label className="justify-center text-center self-center">
            <b>#</b>
          </label>
          <input
            className="bg-transparent w-full pl-2"
            id="summonerTag"
            name="summonerTag"
            type="text"
            placeholder="TAG"
            maxLength={5}
            required
          />
        </div>

        <div className="flex h-full w-fit aspect-square p-1 bg-slate-600 rounded-r-md">
          <button type="submit">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/search--v1.png"
              alt="search--v1"
            />
          </button>
        </div>
      </form>

      {/* Data Wrapper */}
    </div>
  );
}