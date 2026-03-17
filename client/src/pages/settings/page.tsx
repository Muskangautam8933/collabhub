import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seprateBySpaces, strCaptalize } from "@/utils/formate-string";
import { Link, Outlet } from "react-router";
import { usePageContext } from "./_context";

export default function Page() {
  const ctx = usePageContext();

  return (
    <div className="size-full">
      <Tabs defaultValue={ctx.activeTab} className="w-full">
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
      </Tabs>

      <Outlet />
      <div className="space-y-3 mt-6">
        {ctx.optionsLoading && <p>Loading options...</p>}

        {ctx.optionsError && <p>{ctx.optionsError}</p>}

        {ctx.options.map((opt) => (
          <div
            key={opt._id}
            className="flex items-center justify-between border rounded-md p-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: opt.color }}
              />

              <div>
                <p className="font-medium">{opt.name}</p>
                <p className="text-sm text-gray-500">{opt.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Page.displayName = "SettingsPage";
