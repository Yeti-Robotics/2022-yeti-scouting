import Layout from '@/components/Layout';
import ScoutingForm from '@/components/ScoutingForm';
import { NextPage } from 'next';
import React from 'react';

const standScouting: NextPage = () => {
    return (
        <Layout>
            <ScoutingForm />
        </Layout>
    );
}

export default standScouting;