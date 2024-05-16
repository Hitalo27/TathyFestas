import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useRouter } from 'next/router';
import { PageContext } from '@/types/enums/PageContext';

export type BreadcrumbLink = {
    text: string;
    pageContext?: PageContext;
    onClick?: () => void;
};

type BreadcrumbsProps = {
    links: BreadcrumbLink[];
};

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
    const router = useRouter();

    const handleNavigation = (pageContext?: PageContext) => {
        if (pageContext) {
            router.push(pageContext);
        }
    };

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {links.map((link, index) => {
                const isLast = index === links.length - 1;
                return isLast ? (
                    <Typography color="text.primary" key={link.text}>
                        {link.text}
                    </Typography>
                ) : (
                    <Link
                        key={link.text}
                        href={link.pageContext || '#'}
                        onClick={(event) => {
                            event.preventDefault();
                            link.onClick?.();
                            handleNavigation(link.pageContext);
                        }}
                        color="inherit"
                    >
                        {link.text}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
