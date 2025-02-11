import PrintCard from "../components/printCard";
import useFakeData from "../store/fakedatastore";

function Landing() {
    const { fakeData } = useFakeData();
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols--4 gap-4">
      {fakeData?.map(
        (
          { id, title, name, description, actProf, totalNumber, createdDate,status },
          index
        ) => (
          <PrintCard
            key={index}
            id={id}
            title={title}
            description={description}
            name={name}
            actProf={actProf}
            totalNumber={totalNumber}
            createdDate={createdDate}
            status={status}
          />
        )
      )}
    </div>
  );
}
export default Landing;
