import { FaStar } from "react-icons/fa";
import type { Product } from "../../../shared/api/types";

interface StepProps {
  product: Product;
}

const ReviewsStep = ({ product }: StepProps) => {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-neutral-200 bg-white p-6 lg:my-8">
      <h3 className="text-lg font-semibold text-neutral-800">
        사용자 리뷰 ({product.reviews.length}개)
      </h3>
      <div className="mt-4 space-y-6">
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="border-t border-neutral-200 pt-6 first:border-t-0 first:pt-0"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-neutral-800">
                  {review.reviewerName}
                </p>

                {/* --- 별점 렌더링 --- */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-neutral-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-neutral-600">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500">
            아직 작성된 리뷰가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewsStep;
