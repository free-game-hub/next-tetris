"use client";

import {localeDetails,  locales, usePathname} from "@/i18n/routing";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LanguagesIcon} from "lucide-react";
import {useLocale} from "next-intl";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";


export function LocaleSwitch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();
    const [value, setValue] = useState<string>(currentLocale);

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Language">
                    <LanguagesIcon className="size-4"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white">
                <DropdownMenuRadioGroup
                    value={value}
                    onValueChange={(value) => {
                        setValue(value);
                        router.replace(`/${value}/${pathname}?${searchParams.toString()}`);
                    }}
                >
                    {locales.map((locale) => {
                        return (
                            <DropdownMenuRadioItem key={locale} value={locale}>
                                {localeDetails[locale].label}
                            </DropdownMenuRadioItem>
                        );
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
