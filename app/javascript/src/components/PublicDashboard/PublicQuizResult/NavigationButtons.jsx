import React from "react";

const NavigationButtons = ({
  currentIndex,
  total,
  onPrev,
  onNext,
  onFinish,
}) => (
  <div className="mt-8 flex items-center justify-between">
    <button
      disabled={currentIndex === 0}
      className={`rounded-xl px-6 py-3 ${
        currentIndex === 0
          ? "bg-gray-300 text-gray-600"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      onClick={onPrev}
    >
      Previous
    </button>
    {currentIndex + 1 < total ? (
      <button
        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        onClick={onNext}
      >
        Next
      </button>
    ) : (
      <button
        className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        onClick={onFinish}
      >
        Finish
      </button>
    )}
  </div>
);

export default NavigationButtons;
