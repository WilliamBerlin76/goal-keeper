import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect, ConnectedProps } from "react-redux";

import "./steps.scss";

const mapState = (state: {
                    user: {
                        id: number;
                    }
                }) => {
                return {
                    user: state.user
                };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
    stepId: number;
    name: string;
    stepNum: number;
};

interface nameTypes {
    name: string;
};

const StepCard: React.FC<Props> = ({}) => {

    return (
        <p>step card</p>
    )
};

export default connector(StepCard);