import { useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";

type UseCase = {
  id: number;
  title: string;
  description: string;
};

export default function BestUseCase() {
  const [useCases, setUseCases] = useState<UseCase[]>([
    { id: 1, title: "", description: "" },
  ]);

  const addUseCase = () => {
    const newUseCase = {
      id: Date.now(),
      title: "",
      description: "",
    };
    setUseCases([...useCases, newUseCase]);
  };

  const deleteUseCase = (id: number) => {
    setUseCases(useCases.filter((useCase) => useCase.id !== id));
  };

  const updateUseCase = (
    id: number,
    field: keyof Omit<UseCase, "id">,
    value: string
  ) => {
    setUseCases(
      useCases.map((useCase) =>
        useCase.id === id ? { ...useCase, [field]: value } : useCase
      )
    );
  };

  return (
    <div
      data-layer="Frame 2147205996"
      className="Frame2147205996 self-stretch rounded-2xl inline-flex flex-col justify-start items-start gap-6"
    >
      <div
        data-layer="Row"
        className="Row self-stretch rounded-3xl flex flex-col justify-center items-start gap-4 overflow-hidden"
      >
        <div
          data-layer="Row"
          className="Row self-stretch h-14 inline-flex justify-start items-center"
        >
          <div
            data-layer="Column"
            className="Column flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-between items-center"
          >
            <div
              data-layer="Frame 2147223611"
              className="Frame2147223611 flex-1 flex justify-between items-center"
            >
              <div
                data-layer="Frame 2147223626"
                className="Frame2147223626 flex justify-start items-center gap-4"
              >
                <div
                  data-layer="Frame 2147205991"
                  className="Frame2147205991 flex justify-start items-center"
                >
                  <GripVertical className="w-6 h-6 text-neutral-50" />
                </div>
                <div
                  data-layer="Text"
                  className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Best Use Case
                </div>
              </div>
              <button
                onClick={addUseCase}
                className="Frame2147205993 flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                data-layer="Frame 2147205993"
              >
                <div
                  data-layer="Add More Use Case"
                  className="AddMoreUseCase justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Add More Use Case
                </div>
                <Plus className="w-6 h-6 text-neutral-50" />
              </button>
            </div>
          </div>
        </div>

        {useCases.map((useCase, index) => (
          <div
            key={useCase.id}
            data-layer="Row"
            className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex justify-start items-center overflow-hidden"
          >
            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 rounded-xl inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Frame 2147205991"
                className="Frame2147205991 inline-flex justify-start items-center"
              >
                <GripVertical className="w-6 h-6 text-neutral-50" />
              </div>
              <div
                data-layer="Text"
                className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                UseCase {index + 1}
              </div>
            </div>
            <div
              data-layer="Frame 2147205992"
              className="Frame2147205992 flex-1 inline-flex flex-col justify-center items-start gap-2"
            >
              <div
                data-layer="Frame 2147205559"
                className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
              >
                <div
                  data-layer="Title"
                  className="Title justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Title
                </div>
                <div
                  data-layer="Input"
                  className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
                >
                  <input
                    type="text"
                    value={useCase.title}
                    onChange={(e) =>
                      updateUseCase(useCase.id, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>
              <div
                data-layer="Frame 2147205560"
                className="Frame2147205560 self-stretch flex flex-col justify-center items-start gap-2"
              >
                <div
                  data-layer="Description"
                  className="Description justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Description
                </div>
                <div
                  data-layer="Input"
                  className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
                >
                  <input
                    type="text"
                    value={useCase.description}
                    onChange={(e) =>
                      updateUseCase(useCase.id, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </div>
            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 flex justify-start items-center gap-4"
            >
              <button
                onClick={() => deleteUseCase(useCase.id)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Delete use case"
              >
                <Trash2 className="w-6 h-6 text-neutral-50" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
