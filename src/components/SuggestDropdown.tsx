import ReactSearchBox from "react-search-box";


export default function SuggestDropdown() {
  return (
    <ReactSearchBox
      placeholder="Search for John, Jane or Mary"
      data={[
        {
          key: "john",
          value: "John Doe"
        }
      ]}
      onSelect={(record: any) => console.log(record)}
      onFocus={() => {
        console.log("This function is called when is focussed");
      }}
      onChange={(value) => console.log(value)}
      autoFocus
      leftIcon={<>🎨</>}
      iconBoxSize="48px"
    />
  );
}