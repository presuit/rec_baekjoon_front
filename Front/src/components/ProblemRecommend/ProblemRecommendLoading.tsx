/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {
  LoadingContainerAnimation,
  LoadingGradientAnimation,
  LoadingTextAnimation,
} from "../../animations/problemRecommend";
import MovingGradient from "../MovingGradient";

interface IProblemRecommendLoading {
  handleClickToBreak: () => void;
  isReady: boolean;
}

const ProblemRecommendLoading: React.FC<IProblemRecommendLoading> = ({
  handleClickToBreak,
  isReady,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  return (
    <motion.div
      onClick={handleClickToBreak}
      key={"nonClicked"}
      variants={LoadingContainerAnimation}
      initial="enter"
      animate="animate"
      exit={"exit"}
      className="w-full max-w-screen-sm aspect-square ring-4 ring-offset-4 ring-slate-700 ring-offset-slate-900 bg-transparent rounded-3xl relative shadow-2xl overflow-hidden"
    >
      {/* 로딩 움직이는 그래디언트 */}
      <motion.div
        ref={container}
        variants={LoadingGradientAnimation}
        className="w-full h-full"
      >
        <MovingGradient
          width={container.current?.clientWidth || 0}
          height={container.current?.clientHeight || 0}
        />
      </motion.div>
      {/* 그래디언트 위에 올라올 텍스트 컨테이너 */}
      <motion.div
        variants={LoadingTextAnimation}
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center "
      >
        <AnimatePresence exitBeforeEnter>
          {isReady ? (
            // 준비 된 상태, 클릭하면 문제 리스트가 나옴
            <motion.div
              key={"ready"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full cursor-pointer flex flex-col gap-5 justify-center items-center"
            >
              <h1 className="text-5xl text-white font-semibold text-center">
                준비가 되었습니다.
              </h1>
              <span className="text-lg text-white font-semibold">
                화면을 클릭해 주세요.
              </span>
            </motion.div>
          ) : (
            // 문제가 아직 로딩중인 상태
            <motion.div
              key={"loading"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-5 justify-center items-center p-5"
            >
              <h1 className="text-5xl text-white font-semibold text-center">
                잠시만 기다려 주세요.
              </h1>
              <span className="text-lg text-white font-semibold">
                xxx님의 정보를 바탕으로 추천할 문제들을 준비하고 있습니다.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProblemRecommendLoading;
