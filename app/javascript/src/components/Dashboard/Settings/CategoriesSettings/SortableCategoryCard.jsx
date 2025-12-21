import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CategoryCard from "./CategoryCard";

const SortableCategoryCard = props => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <CategoryCard
        {...props}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
};

export default SortableCategoryCard;
