import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import type React from "react";

/**********************************************************************
 ************************* TYPES **************************************
 **********************************************************************/
type TReactListProps = React.ComponentProps<"div"> & {
  show?: boolean;
};
type TEmptyProps = React.ComponentProps<"div"> & {
  show?: boolean;
};
type TLoadingProps = React.ComponentProps<"div"> & {
  loading?: boolean;
};

type TReactList = React.FC<TReactListProps> & {
  Empty: TEmpty;
  Item: TItem;
  Loading: TLoading;
};

type TLoading = React.FC<TLoadingProps>;

type TEmpty = React.FC<TEmptyProps>;

type TItem = React.FC<React.ComponentProps<"div">>;
/**********************************************************************
 ************************* COMPONENT **********************************
 **********************************************************************/

export const ResultList: TReactList = ({ className, show, ...props }) => {
  if (!show) return null;
  return (
    <Card
      data-slot="result-list"
      className={cn("p-2 rounded-sm", className)}
      {...props}
    />
  );
};

const Empty: TEmpty = ({ className, show = true, ...props }) => {
  if (!show) return null;
  return (
    <div
      data-slot="result-list-empty"
      className={cn("mx-auto capitalize", className)}
      {...props}
    />
  );
};

const Item: TItem = ({ className, ...props }) => {
  return (
    <div
      data-slot="result-list-item"
      className={cn("", className)}
      {...props}
    />
  );
};

const Loading: TLoading = ({ className, loading = true, ...props }) => {
  if (!loading) return null;
  return (
    <div
      data-slot="result-list-loading"
      className={cn("mx-auto capitalize", className)}
      {...props}
    />
  );
};

ResultList.Empty = Empty;
ResultList.Item = Item;
ResultList.Loading = Loading;
