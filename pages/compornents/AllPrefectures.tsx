import type { NextPage } from "next";

interface Props {
  result: { prefCode: number; prefName: string }[];
  onChange: () => void;
}

const AllPrefectures: NextPage<Props> = ({ result, onChange }: Props) => {
  return (
    <>
      {result.map((pre) => (
        <div>
          <input type="checkbox" />
          <label>{pre.prefName}</label>
        </div>
      ))}
    </>
  );
};

export default AllPrefectures;
