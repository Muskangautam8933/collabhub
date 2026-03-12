import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seprateBySpaces, strCaptalize } from "@/utils/formate-string";
import { Link, Outlet } from "react-router";
import { usePageContext } from "./_context";

export default function Page() {
  const ctx = usePageContext();

  return (
    <div className="w-full min-h-full overflow-y-auto">
      <Tabs defaultValue={ctx.activeTab} className="w-full ">
        <TabsList>
          {ctx.childRoutes.map((r) => {
            return (
              <Link key={r} to={r.toLocaleLowerCase()}>
                <TabsTrigger value={r}>
                  {strCaptalize(seprateBySpaces(r))}
                </TabsTrigger>
              </Link>
            );
          })}
        </TabsList>
           <div className=" w-full">
          <Outlet />
        </div>
      </Tabs>

     
    </div>
  );
}

Page.displayName = "SettingsPage";
