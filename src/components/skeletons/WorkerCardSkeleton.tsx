import React from "react";
import { Skeleton } from "antd";

const WorkerCardSkeleton: React.FC = () => {
    return (
        <div className="carousel-slide">
            <Skeleton
                active
                avatar
                title
                paragraph={{ rows: 3 }}
                className="worker-card"
            />
        </div>
    );
};

export default WorkerCardSkeleton;
