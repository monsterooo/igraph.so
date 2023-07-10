import { observer } from "mobx-react-lite";
import { useUiStore } from "@/provider/ui"
import { TABLE_SIZE } from "@/constants";
import { Trash, ChevronDown, ChevronUp } from "@/components/svgs"

export const Header = observer(() => {
  const uiStore = useUiStore();

  const handleToggleSize = () => {
    switch(uiStore.tableSize) {
      case TABLE_SIZE.MIN:
        uiStore.setTableSize(TABLE_SIZE.MAX)
        break;
      case TABLE_SIZE.MAX:
        uiStore.setTableSize(TABLE_SIZE.MIN);
        break;
    }
  }

  const handleClearData = () => {
    const hotInstance = uiStore.hotTable?.hotInstance;
    if (!hotInstance) return;
    hotInstance.clear();
  }

  return (
    <div className="flex justify-between px-4 py-2">
      <div>Enter or paste data here</div>
      <div className="flex gap-4">
        <div
          className="group transition duration-300 ease-in-out cursor-pointer flex items-center justify-between rounded-lg px-2 py-1 transition-color hover:bg-white/10 active:bg-white/10 focus:outline-none focus:ring"
          onClick={handleClearData}
        >
          <Trash />
          <span className="transition-colors">
            Clear data
          </span>
        </div>

        <div
          className="group transition duration-300 ease-in-out cursor-pointer flex items-center justify-between rounded-lg px-2 py-1 bg-white/10 transition-color hover:bg-white/20 active:bg-white/20 focus:outline-none focus:ring"
          onClick={handleToggleSize}
        >
          {uiStore.tableSize === TABLE_SIZE.MIN ? <ChevronUp /> : <ChevronDown />}
          <span className="transition-colors">
            {uiStore.tableSize === TABLE_SIZE.MIN ? 'Maximize' : 'Minimize'}
          </span>
        </div>
      </div>
    </div>
  )
})
