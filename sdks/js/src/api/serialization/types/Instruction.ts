/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as JulepApi from "../../api";
import * as core from "../../core";

export const Instruction: core.serialization.ObjectSchema<serializers.Instruction.Raw, JulepApi.Instruction> =
    core.serialization.object({
        content: core.serialization.string(),
        important: core.serialization.boolean().optional(),
    });

export declare namespace Instruction {
    interface Raw {
        content: string;
        important?: boolean | null;
    }
}