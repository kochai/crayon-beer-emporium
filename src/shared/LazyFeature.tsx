import {Suspense, ComponentType, ReactNode, LazyExoticComponent, FC} from 'react';
import LoadingSpinner from './LoadingSpinner';
import {FeatureTypes, isFeatureEnabled} from '../config/featureFlags';

interface LazyFeatureProps {
    featureFlag: FeatureTypes;
    component: LazyExoticComponent<ComponentType<any>>;
    fallback?: ReactNode;
}

const LazyFeature: FC<LazyFeatureProps> = ({
                                                                 featureFlag,
                                                                 component: Component,
                                                                 fallback = <LoadingSpinner/>,
                                                                 ...props
                                                             }) => {
    if (!isFeatureEnabled(featureFlag)) {
        return null;
    }

    return (
        <Suspense fallback={fallback}>
            <Component {...props} />
        </Suspense>
    );
};

export default LazyFeature;