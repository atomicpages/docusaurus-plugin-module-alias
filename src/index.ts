import Joi from '@hapi/joi';
import { Plugin, DocusaurusContext, OptionValidationContext } from '@docusaurus/types';

type Options = {
    alias: Record<string, string>;
    mergeStrategy?: Record<string, string>;
};

const BLACKLIST = ['@site', '@generated', '@docusaurus', '~docs', '~blog', '~pages', '~debug'];

export default function plugin(
    context: DocusaurusContext,
    { alias, mergeStrategy }: Options
): Plugin<void> {
    return {
        name: 'docusaurus-plugin-local-resolve',
        configureWebpack() {
            return {
                mergeStrategy,
                resolve: {
                    alias,
                },
            };
        },
    };
}

export const validateOptions = ({ options, validate }: OptionValidationContext<Options>) => {
    return validate(
        Joi.object({
            alias: Joi.object()
                .pattern(Joi.string().invalid(...BLACKLIST), Joi.string())
                .required(),
            mergeStrategy: Joi.object().pattern(Joi.string(), Joi.string()),
        }),
        options
    );
};
